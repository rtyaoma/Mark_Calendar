class Admin::UsersController < ApplicationController
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
          format.html { redirect_to '/admin/events/index',notice: 'ユーザーを登録しました.' }
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
          format.html { redirect_to '/admin/events/index',notice: 'ユーザーを更新しました.' }
          format.json { render :show, status: :created, location: @user }
        else
          flash.now[:notice] = "正しく入力してください"
          format.html { render :edit}
          format.json { render json: @user.errors, status: :unprocessable_entity }
        end
      end
    end
  
  
  
    private
  
    def user_params
      params.require(:user).permit(
        :name,
        :email,
        :admin,
        :password,
        :image
      )
    end
  
  
  
end
