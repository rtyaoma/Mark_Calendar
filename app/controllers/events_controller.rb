class EventsController < ApplicationController
  before_action :set_event, only: [:show, :edit, :update, :destroy] #パラメータのidからレコードを特定するメソッド
  #before_action :authenticate_user
  before_action :ensure_correct_user, {only: [:edit, :update, :destroy]}
  def index
    @events = Event.all

    respond_to do |format|
      format.html
      format.xml { render :xml => @events }
      format.json { render :json => @events }
    end
  end

  def show
    @event = Event.find_by(id:params[:id])
    @user = @event.user

    respond_to do |format|
      format.html
      format.xml { render :xml => @events }
      format.json { render :json => @events }
    end

  end

  def new
    @event = Event.new
  end

  def edit
    @event = Event.find_by(id:params[:id])
  end

  def create
    @event = Event.new(event_params)
    @event.user_id = @current_user.id
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
    @event = Event.find_by(id:params[:id])
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
      redirect_to("/events/index")
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
        :allday
      )
    end

end
