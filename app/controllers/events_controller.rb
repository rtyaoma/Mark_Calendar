class EventsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_event, {only: [:show, :edit, :update, :destroy, :click_show, :ensure_correct_user]} #パラメータのidからレコードを特定するメソッド
  #before_action :authenticate_user
  before_action :set_current_calendars, {only: [:new, :click_new, :edit]}
  before_action :ensure_correct_user, {only: [:edit, :update, :destroy]} #ログインしているユーザーのみ権限がある


  def index
    @events = Event.where(user_id: @current_user.id, calendar_id: session[:calendar_id]).order(:start)
    t0 = Time.current.beginning_of_day
    t1 = t0.advance(hours: 24)
    half = t0.advance(hours: 12)
    form = t0 + 1.minute
    form_to = t0 - 1.minute
    to_form = t1 - 1.minute
    @today = Date.today
    wd = %w[日 月 火 水 木 金 土]
    @todaydayofweek = "(" + "" + wd[@today.wday] + ")"
    @allday_events = @events.where('"start" = ? AND "end" = ?' , t0, t1).order(:start)
    @today_events = @events.where('"start" > ? AND "end" < ?' , t0, t1).order(:start)
    @after_events = @events.where(start: t0...t1).where('"end" >?',t1)
    @before_events = @events.where('"start" <?',t0).where(end: form...t1)
    @continued_events = @events.where('"start" < ? AND "end" >= ?', form_to, t1).order(:start)
    @am_events = @today_events.where(end: t0...half)
    @pm_events = @today_events.where(end: half...t1)

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
    @event = Event.new
    logger.info "@calendarsの中身が見たい #{@current_calendars.inspect}"
    time0 = Time.current.beginning_of_hour
    @event.start = time0.advance(hours: 1)
    @event.end = time0.advance(hours: 2)
    #@event.start_on = Date.today
    #@event.end_on = @event.start_on
  end

  def edit
    #unless @event.allDay?
      #@event.start_on = @event.start.to_date
      #if @event.end.seconds_since_midnight == 0
         #@event.end_on = @event.end.yesterday.to_date
      #else
        #@event.end_on = @event.end.to_date
      #end
    #end
  end

  def create
    @event = Event.new(event_params)
    @calendar = @event.calendar
    @color = Color.find_by(id: @calendar.color_id)
    @event.color = @color.color_type
    @event.user_id = @current_user.id
    if @event.allDay?
      @event.start = @event.start.beginning_of_day
      @event.end = @event.end.tomorrow.beginning_of_day
    end
    respond_to do |format|
      if @event.save
        flash[:notice] = "予定を登録しました"
        format.html { redirect_to '/events/index',notice: '予定を登録しました.' }
        format.json { render :show, status: :created, location: @event }
      else
        format.html { render :new ,notice: '正しく入力してください.' }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @event.update(event_params)
        format.html { redirect_to '/events/index', notice: 'Event was successfully updated.' }
        format.json { render :show, status: :ok, location: @event }
      else
        format.html { redirect_to '/events/index',notice: '正しく入力してください.'}
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @event.destroy
    respond_to do |format|
      format.html { redirect_to '/events/index', notice: 'Event was successfully destroyed.' }
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
    #logger.info "select値を見たい #{session[:calendar_id]}"
    #results = Event.where(user_id: @current_user.id, calendar_id: session[:calendar_id])
    #@events = Event.where(user_id: @current_user.id, calendar_id: session[:calendar_id])
    #render plain: render_to_string(partial: 'form_index', layout: false, locals: { event: @event })
    #html = render_to_string partial: 'form_index',locals: { event: @events }
    #render :json => {:html => html}
    #render partial: 'form_index', locals:{@events => results}
  end

  def display
    @events = Event.where(user_id: @current_user.id, calendar_id: session[:calendar_id]).order(:start)
    t0 = Time.current.beginning_of_day
    t1 = t0.advance(hours: 24)
    half = t0.advance(hours: 12)
    form = t0 + 1.minute
    form_to = t0 - 1.minute
    to_form = t1 - 1.minute
    @today = Date.today
    wd = %w[日 月 火 水 木 金 土]
    @todaydayofweek = "(" + "" + wd[@today.wday] + ")"
    @allday_events = @events.where('"start" = ? AND "end" = ?' , t0, t1).order(:start)
    @today_events = @events.where('"start" > ? AND "end" < ?' , t0, t1).order(:start)
    @after_events = @events.where(start: t0...t1).where('"end" >?',t1)
    @before_events = @events.where('"start" <?',t0).where(end: form...t1)
    @continued_events = @events.where('"start" < ? AND "end" > ?', form_to, t1).order(:start)
    @am_events = @today_events.where(end: t0...half)
    @pm_events = @today_events.where(end: half...t1)
  end

  def today
    t0 = Time.current.beginning_of_day
    t1 = t0.advance(hours: 24)
    @events = Event.where("'start' >= ? AND 'start' < ?", t0,t1) or Event.where("'end' > ? AND 'end'<= ?",t0,t1).order(:start)
    #@continued_events = Event.where("'start' < ?",t0).where("'end' >?",t1).order(:start)
    render action: :index
  end

  def refetch_index
    @events = Event.where(user_id: @current_user.id, calendar_id: session[:calendar_id]).order(:start)
    t0 = Time.current.beginning_of_day
    t1 = t0.advance(hours: 24)
    half = t0.advance(hours: 12)
    form = t0 + 1.minute
    form_to = t0 - 1.minute
    to_form = t1 - 1.minute
    @today = Date.today
    wd = %w[日 月 火 水 木 金 土]
    @todaydayofweek = "(" + "" + wd[@today.wday] + ")"
    @allday_events = @events.where('"start" = ? AND "end" = ?' , t0, t1).order(:start)
    @today_events = @events.where('"start" > ? AND "end" < ?' , t0, t1).order(:start)
    @after_events = @events.where(start: t0...t1).where('"end" >?',t1)
    @before_events = @events.where('"start" <?',t0).where(end: form...t1)
    @continued_events = @events.where('"start" < ? AND "end" > ?', form_to, t1).order(:start)
    @am_events = @today_events.where(end: t0...half)
    @pm_events = @today_events.where(end: half...t1)
    render plain: render_to_string(partial: 'form_index', layout: false, locals: { event: @event })
    respond_to do |format|
    format.html
    format.xml { render :xml => @events }
    format.json { render :json => @events }
    end
  end


    private
    def set_event
      @event = Event.find_by(id:params[:id])
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
     @current_calendars = Calendar.where(id:session[:calendar_id])
     @titles = @current_calendars.select(:title,:id).distinct
      else
        flash[:notice] = "カレンダーの選択がありません"
        redirect_to("/events/index")
      end
    end
    
end
