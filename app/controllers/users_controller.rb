class UsersController < ApplicationController
  before_action :authenticate_user, {only: [:index, :show, :edit, :update]}
  before_action :forbid_login_user, {only: [:new, :create, :login_form, :login]}
  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def show
    @user = User.find_by(id:params[:id])
  end

  def create
    @user = User.new(user_params)
    if @user.image = nil
      @user.image = "defalut_user.jpg"
    end
    respond_to do |format|
      if @user.save
        session[:user_id] = @user.id
        format.html { redirect_to '/events/index',notice: 'ユーザーを登録しました.' }
        format.json { render :show, status: :created, location: @user }
      else
        flash.now[:notice] = "正しく入力してください"
        format.html { render :new}
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def edit
    @user = User.find_by(id:params[:id])
  end

  def update
    @user = User.find_by(id:params[:id])
    @user.update(user_params)
    @user.update params.require(:user).permit(:image)
    respond_to do |format|
      if @user.save
        format.html { redirect_to '/events/index',notice: 'ユーザーを更新しました.' }
        format.json { render :show, status: :created, location: @user }
      else
        flash.now[:notice] = "正しく入力してください"
        format.html { render :edit}
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def login_form
  end

  def login
    @user = User.find_by(email: params[:email])

    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      flash[:notice] = "ログインしました"
      redirect_to("/events/index")
    else
      @error_message = "メールアドレスまたはパスワードが間違っています"
      logger.info "@errorの中身が見たい #{@error_message.inspect}"
      #flash[:notice] = "メールアドレスまたはパスワードが間違っています"
      @email = params[:email]
      @password = params[:password]
      render("users/login_form")
    end
  end

  def logout
    session[:user_id] = nil
    flash[:notice] = "ログアウトしました"
    redirect_to("/home/top")
  end


  private

  def user_params
    params.require(:user).permit(
      :name,
      :email,
      :password,
      :image
    )
  end


end
