class TasksController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_task, {only: [:show, :edit, :update, :destroy, :ensure_correct_user, :done, :begin]} #パラメータのidからレコードを特定するメソッド
  #before_action :authenticate_user
  #before_action :set_current_calendars, {only: [:new]}
  #before_action :ensure_correct_user, {only: [:edit, :update, :destroy]} #ログインしているユーザーのみ権限がある
  def index
    #@tasks = Task.where(calendar_id: params[:calendar_id])
    #logger.info "@tasksの中身が見たい #{@tasks.inspect}" 
    @tasks = Task.where(user_id: @current_user.id)
    #logger.info "@tasksの中身が見たい #{@tasks.inspect}" 
    #@tasks = Task.where(user_id: @current_user.id, status: false)
    respond_to do |format|
    format.html
    format.xml { render :xml => @tasks }
    format.json { render :json => @tasks }
    end
  end

  def show
    @user = @task.user
    respond_to do |format|
      format.html
      format.xml { render :xml => @tasks }
      format.json { render :json => @tasks }
    end
  end



  def new
    @task = Task.new
  end

  def edit
  end

  def create
    @task = Task.new(task_params)
    @task.user_id = @current_user.id
    #@task.calendar_id = session[:calendar_id]
    #@task.calendar_id = @current_calendar.id
    respond_to do |format|
      if @task.save
        format.html { redirect_to '/tasks/index',notice: 'Task was successfully created.' }
        format.json { render :show, status: :created, location: @task }
      else
        format.html { render :new }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @task.update(task_params)
        format.html { redirect_to '/tasks/index', notice: 'Task was successfully updated.' }
        format.json { render :show, status: :ok, location: @task }
      else
        format.html { render :edit }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @task.destroy
    respond_to do |format|
      format.html { redirect_to '/tasks/index', notice: 'Task was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def ensure_correct_user
    if @task.user_id != @current_user.id
      flash[:notice] = "権限がありません"
      redirect_to("/login")
    end
  end

  def done
    @task.update(status: true)
    @tasks= Task.where(user_id: @current_user.id)
    render :index
  end

  def begin
    @task.update(status: false)
    @tasks= Task.where(user_id: @current_user.id)
    render :index
  end

  def today
    t0 = Time.current.beginning_of_day
    t1 = t0.advance(hours: 24)
    @tasks = Task.where('deadline_date >= ? and deadline_date < ?', t0,t1)
    #@continued_tasks = Task.where('deadline_date < ?',t0).order(:start)
    render action: :index
  end

  def complete
    @tasks = Task.where(status: true)
    render action: :index
  end

  def incomplete
    @tasks = Task.where(status: false)
    render action: :index
  end


    private
    def set_task
      @task = Task.find_by(id:params[:id])
    end

    def task_params
      params.require(:task).permit(
        :title,
        :deadline_date,
        :description,
        :status
      )
    end
    #def set_current_calendars
      #if session[:calendar_id]
     #@current_calendars = Calendar.find(session[:calendar_id])
      #else
        #flash[:notice] = "カレンダーの選択がありません"
        #redirect_to("/tasks/index")
      #end
    #end

end
