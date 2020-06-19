class EventsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_event, {only: [:show, :edit, :update, :destroy, :click_show, :ensure_correct_user]} 
  before_action :authenticate_user
  before_action :chart_event, {only: [:chart_filter, :filter_index]}
  before_action :index_display, {only: [:index, :display]}
  before_action :set_current_calendars, {only: [:new, :click_new, :edit, :create,:update, :new_select]}
  before_action :ensure_correct_user, {only: [:edit, :update, :destroy]} 
  before_action :set_time, {only: [:index, :display]}
  before_action :set_new,{only: [:new, :click_new, :new_select]}

  def index
    respond_to do |format|
    format.html
    format.xml { render :xml => @events }
    format.json { render :json => @events }
    end
  end

  def show
    @user = @event.user
    @calendar = @event.calendar
    youbi = %w[日 月 火 水 木 金 土]
    @dayofweekstart = "(" + "" + youbi[@event.start.wday] + ")"
    @dayofweekend = "(" + "" + youbi[@event.end.wday] + ")"
    respond_to do |format|
      format.html
      format.xml { render :xml => @events }
      format.json { render :json => @events }
    end
  end

  def new
    time0 = Time.current.beginning_of_hour
    @event.start = time0.advance(hours: 1)
    @event.end = time0.advance(hours: 2)
  end

  def edit
  end

  def create
    @event = Event.new(event_params)
    @event.user_id = @current_user.id
    calendar = @event.calendar
    if calendar !=  nil
      color = Color.find_by(id: calendar.color_id)
      @event.color = color.color_type
    end
    respond_to do |format|
      if @event.save
        flash[:notice] = "予定を登録しました"
        format.html { redirect_to events_url, notice: '予定を登録しました.' }
        format.json { render :show, status: :created, location: @event }
      else
        flash.now[:notice] = "正しく入力してください"
        format.html { render :new}
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    calendar = Calendar.find_by(id: params[:event][:calendar_id])
    color = Color.find_by(id: calendar.color_id)
    @event.color = color.color_type
    respond_to do |format|
      if @event.update(event_params)
        format.html { redirect_to events_url, notice: '予定を更新しました' }
        format.json { render :show, status: :ok, location: @event }
      else
        flash.now[:notice] = "正しく入力してください"
        format.html { render :edit} 
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @event.destroy
    respond_to do |format|
      format.html { redirect_to events_url, notice: '予定を削除しました' }
      format.json { head :no_content }
    end
  end

  def ensure_correct_user
    if @event.user_id != @current_user.id
      flash[:notice] = "権限がありません"
      redirect_to("/login")
    else
      return true
    end
  end

  def click_show
    @calendar = @event.calendar
    youbi = %w[日 月 火 水 木 金 土]
    @dayofweekstart = "(" + "" + youbi[@event.start.wday] + ")"
    @dayofweekend = "(" + "" + youbi[@event.end.wday] + ")"
    @user = @event.user
    render plain: render_to_string(partial: 'form_show', layout: false, locals: { event: @event })
    respond_to do |format|
      format.html
      format.xml { render :xml => @events }
      format.json { render :json => @events }
    end
  end

  def select
    session[:calendar_id] = params[:calendar_id]
  end

  def display
  end


  def new_select
    @event.start = params[:event][:start]
    @event.end = params[:event][:end]
    @event.allDay = params[:event][:allDay]
  end


  def chart
  end



  def chart_filter
    calendar_ids = @month_events.pluck(:calendar_id)
    @calendar_group = Calendar.where(id: calendar_ids).pluck(:id, :title)
    @events_group = @month_events.group(:calendar_id, :color).order(:calendar_id).count
    @events_group.each do |key, value|
      @events_key = @events_group.keys
      @events_count = @events_group.values
    end
  end

  def filter_index
    @calendar_events = @month_events.where(calendar_id: params[:chart][:calendar_id]).order(:start)
  end


    private

    def set_event
      @event = Event.find_by(id: params[:id])
    end

    def set_new
      @event = Event.new
    end


    def event_params
      params.require(:event).permit(
        :title,
        :start,
        :end,
        :place,
        :description,
        :color,
        :allDay,
        :calendar_id,
      )
    end

    def set_current_calendars
      if session[:calendar_id]
        @current_calendars = Calendar.where(id: session[:calendar_id], user_id: @current_user.id,)
        @titles = @current_calendars.select(:title,:id).distinct
      else
        flash[:notice] = "カレンダーの選択がありません"
        redirect_to events_url
      end
    end

    def set_time
      @t0 = Time.current.beginning_of_day
      @t1 = @t0.advance(hours: 24)
      @half = @t0.advance(hours: 12)
      @form = @t0 + 1.minute
      @form_to = @t0 - 1.minute
      @to_form = @t1 - 1.minute
      @today = Date.today
      wd = %w[日 月 火 水 木 金 土]
      @todaydayofweek = "(" + "" + wd[@today.wday] + ")"
    end

    def chart_event
      @month = ((params[:chart][:start]).to_date).beginning_of_day
      next_month = ((params[:chart][:end]).to_date).beginning_of_day
      @events = Event.where(user_id: @current_user.id)
      @month_events = @events.where('"start" >=? AND "end" <=?',@month, next_month)
    end

    def index_display
      @events = Event.where(user_id: @current_user.id, calendar_id: session[:calendar_id]).order(:start)
      @allday_events = @events.where('"start" = ? AND "end" = ?' , @t0, @t1).order(:start)
      @today_events = @events.where('"start" > ? AND "end" < ?' , @t0, @t1).order(:start)
      @after_events = @events.where(start: @t0...@t1).where('"end" >?',@t1)
      @before_events = @events.where('"start" <?',@t0).where(end: @form...@t1)
      @continued_events = @events.where('"start" < ? AND "end" > ?', @form_to, @t1).order(:start)
      @am_events = @today_events.where(end: @t0...@half)
      @pm_events = @today_events.where(end: @half...@t1)
    end


    
end
