class EventsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_event, {only: [:show, :edit, :update, :destroy, :click_show, :ensure_correct_user]} #パラメータのidからレコードを特定するメソッド
  #before_action :authenticate_user
  before_action :set_current_calendars, {only: [:new, :click_new, :edit, :create,:update, :new_select]}
  before_action :ensure_correct_user, {only: [:edit, :update, :destroy]} #ログインしているユーザーのみ権限がある
  before_action :set_time, {only: [:index, :display]}


  def index
    @events = Event.where(user_id: @current_user.id, calendar_id: session[:calendar_id]).order(:start)
    @allday_events = @events.where('"start" = ? AND "end" = ?' , @t0, @t1).order(:start)
    @today_events = @events.where('"start" > ? AND "end" < ?' , @t0, @t1).order(:start)
    @after_events = @events.where(start: @t0...@t1).where('"end" >?',@t1)
    @before_events = @events.where('"start" <?',@t0).where(end: @form...@t1)
    @continued_events = @events.where('"start" < ? AND "end" >= ?', @form_to, @t1).order(:start)
    @am_events = @today_events.where(start: @t0...@half)
    @pm_events = @today_events.where(start: @half...@t1)
    respond_to do |format|
    format.html
    format.xml { render :xml => @events }
    format.json { render :json => @events }
    end
  end

  def show
    @user = @event.user
    #logger.info "@user頼む #{@user.inspect}"
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
    @event = Event.new
    #logger.info "@calendarsの中身が見たい #{@current_calendars.inspect}"
    time0 = Time.current.beginning_of_hour
    @event.start = time0.advance(hours: 1)
    @event.end = time0.advance(hours: 2)
  end

  def edit
  end

  def create
    @event = Event.new(event_params)
    start_on = @event.start.strftime('%d') 
    end_on = @event.end.strftime('%d') 
    logger.info "@calendarsの中身が見たい #{start_on.inspect}"
    @event.user_id = @current_user.id
    calendar = @event.calendar
    if calendar !=  nil
      color = Color.find_by(id: calendar.color_id)
      @event.color = color.color_type
    end
    if @event.allDay? && start_on == end_on
      @event.start = @event.start.beginning_of_day
      @event.end = @event.end.tomorrow.beginning_of_day
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
    end
  end

  def click_new
    @event = Event.new
    @event.calendar_id = session[:calendar_id]
    render plain: render_to_string(partial: 'form_new', layout: false, locals: { event: @event })
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
    @events = Event.where(user_id: @current_user.id, calendar_id: session[:calendar_id]).order(:start)
    @allday_events = @events.where('"start" = ? AND "end" = ?' , @t0, @t1).order(:start)
    @today_events = @events.where('"start" > ? AND "end" < ?' , @t0, @t1).order(:start)
    @after_events = @events.where(start: @t0...@t1).where('"end" >?',@t1)
    @before_events = @events.where('"start" <?',@t0).where(end: @form...@t1)
    @continued_events = @events.where('"start" < ? AND "end" > ?', @form_to, @t1).order(:start)
    @am_events = @today_events.where(end: @t0...@half)
    @pm_events = @today_events.where(end: @half...@t1)
  end

  def today
    t0 = Time.current.beginning_of_day
    t1 = t0.advance(hours: 24)
    @events = Event.where("'start' >= ? AND 'start' < ?", t0,t1) or Event.where("'end' > ? AND 'end'<= ?",t0,t1).order(:start)
    render action: :index
  end

  def new_select
    @event = Event.new
    @event.start = params[:event][:start]
    @event.end = params[:event][:end]
    @event.allDay = params[:event][:allDay]
  end

  def events_show
    show_start = params[:event][:start]
    show_end = params[:event][:end]
    @events = Event.where('"start" >=? AND "end" <=?',show_start, show_end)
  end

    private
    def set_event
      @event = Event.find_by(id: params[:id])
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
        :tag_list
      )
    end

    def set_current_calendars
      if session[:calendar_id]
        logger.info "@calendarid頼む #{session[:calendar_id]}"
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
    
end
