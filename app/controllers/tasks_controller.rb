class TasksController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_task, {only: [:show, :edit, :update, :destroy, :ensure_correct_user, :done, :begin]} #パラメータのidからレコードを特定するメソッド
  before_action :set_sub_tasks, {only: [:done]}
  before_action :authenticate_user
  #before_action :set_current_calendars, {only: [:new]}
  before_action :ensure_correct_user, {only: [:edit, :update, :destroy]} #ログインしているユーザーのみ権限がある

  def index
    t0 = Time.current.beginning_of_day
    t1 = t0.advance(hours: 24)
    @tasks = Task.where(user_id: @current_user.id)
    @today_tasks = @tasks.where('deadline_date >= ? AND deadline_date < ?', t0,t1)
    @incomplete_tasks = @tasks.where(status: false).where('deadline_date < ?',t0)
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
    @task.sub_tasks.build
  end

  def edit
  end

  def create
    @task = Task.new(task_params)
    @task.user_id = @current_user.id
    respond_to do |format|
      if @task.save
        format.html { redirect_to tasks_url,　notice: 'タスクを作成しました' }
        format.json { render :show, status: :created, location: @task }
      else
        flash.now[:notice] = "正しく入力してください"
        format.html { render :new }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @task.update(task_params)
        format.html { redirect_to tasks_url, notice: 'タスクを更新しました。' }
        format.json { render :show, status: :ok, location: @task }
      else
        flash.now[:notice] = "正しく入力してください"
        format.html { render :edit }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @task.destroy
    respond_to do |format|
      format.html { redirect_to tasks_url, notice: '予定を削除しました。' }
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
  end

  def begin
    @task.update(status: false)
    @tasks= Task.where(user_id: @current_user.id)
  end


  def filter
    @tasks = Task.where(user_id: @current_user.id).order(deadline_date: :desc)
    render plain: render_to_string(partial: 'form_index', layout: false, locals: {@tasks => @tasks} )
  end


    private
    def set_task
      @task = Task.find_by(id: params[:id])
    end

    def set_sub_tasks
      @sub_tasks = SubTask.where(task_id: params[:id])
    end

    def task_params
      params.require(:task).permit(
        :title,
        :deadline_date,
        :description,
        :status,
        sub_tasks_attributes: [:id, :title, :status, :_destroy]
      )
    end
end
