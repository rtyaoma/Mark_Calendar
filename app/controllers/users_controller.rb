class UsersController < ApplicationController
  before_action :set_user, {only: [:show, :edit, :update, :destroy]}
  before_action :authenticate_user, {only: [:index, :show, :edit, :update]}
  before_action :forbid_login_user, {only: [:new, :create, :login_form, :login]}
  
  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def show
  end


  def create
    @user = User.new(user_params)
    if @user.image = nil
      @user.image = "defalut_user.jpg"
    end
    respond_to do |format|
      if @user.save 
        session[:user_id] = @user.id
        format.html { redirect_to events_path, notice: 'ユーザーを登録しました.' }
        format.json { render :show, status: :created, location: @user }
      else
        flash.now[:notice] = "正しく入力してください"
        format.html { render :new}
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def edit
  end

  def update
    @user.update(user_params)
    @user.update params.require(:user).permit(:image)
    respond_to do |format|
      if @user.save
        format.html { redirect_to events_url, notice: 'ユーザーを更新しました.' }
        format.json { render :show, status: :created, location: @user }
      else
        flash.now[:notice] = "正しく入力してください"
        format.html { render :edit}
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    session[:user_id] = nil
    session[:calendar_id] = nil
    @user.destroy
    respond_to do |format|
      format.html { redirect_to "/", notice: 'ユーザーを削除しました' }
      format.json { head :no_content }
    end
  end

  def login_form
  end

  def login
    @user = User.find_by(email: params[:email])
    respond_to do |format|
      if @user && @user.authenticate(params[:password])
        session[:user_id] = @user.id
        if @user.get_calendar_ids != nil
        session[:calendar_id] = @user.get_calendar_ids
        end
        format.html { redirect_to events_url, notice: 'ログインしました.' }
        format.json { render :show, status: :created, location: @user }
      else
        flash.now[:notice] = "正しく入力してください"
        format.html { render :login_form}
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def logout
    session[:user_id] = nil
    session[:calendar_id] = nil
    flash[:notice] = "ログアウトしました"
    redirect_to("/home/top")
  end


  private

  def set_user
    @user = User.find_by(id: params[:id])
  end

  def user_params
    params.require(:user).permit(
      :name,
      :email,
      :password,
      :image,
      :admin
    )
  end

end
