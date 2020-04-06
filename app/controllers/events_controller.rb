class EventsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_event, {only: [:show, :edit, :update, :destroy, :click_show]} #パラメータのidからレコードを特定するメソッド
  #before_action :authenticate_user
  before_action :set_current_calendars, {only: [:new]}
  before_action :ensure_correct_user, {only: [:edit, :update, :destroy]} #ログインしているユーザーのみ権限がある
  def index
    #@events = Event.where(calendar_id: params[:calendar_id])
    #@events = Event.all
    logger.info "値を見たい #{session[:calendar_id]}"
    logger.info "@eventsの中身が見たい #{@events.inspect}" 
    @events = Event.where(user_id: @current_user.id, calendar_id: session[:calendar_id])
    logger.info "@eventsの中身が見たい #{@events.inspect}" 
    respond_to do |format|
    format.html
    format.xml { render :xml => @events }
    format.json { render :json => @events }
    end
  end

  def show
    @user = @event.user
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
    @event.start_on = Date.today
    @event.end_on = @event.start_on
  end

  def edit
    unless @event.allday?
      @event.start_on = @event.start.to_date
      if @event.end.seconds_since_midnight == 0
         @event.end_on = @event.end.yesterday.to_date
      else
        @event.end_on = @event.end.to_date
      end
    end
  end

  def create
    @event = Event.new(event_params)
    @event.user_id = @current_user.id
    #@event.calendar_id = session[:calendar_id]
    #@event.calendar_id = @current_calendar.id
    respond_to do |format|
      if @event.save
        format.html { redirect_to '/events/index',notice: 'Event was successfully created.' }
        format.json { render :show, status: :created, location: @event }
      else
        format.html { render :new }
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
        format.html { render :edit }
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
    @event = Event.find_by(id: params[:id])
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
        #:color,
        :allday,
        :start_on, :end_on,
        :calendar_id
      )
    end

    def set_current_calendars
      if session[:calendar_id]
     @current_calendars = Calendar.find(session[:calendar_id])
      else
        flash[:notice] = "カレンダーの選択がありません"
        redirect_to("/events/index")
      end
    end

end
