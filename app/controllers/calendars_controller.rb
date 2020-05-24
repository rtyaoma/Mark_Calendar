class CalendarsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :color_select, {only: [:new, :edit, :create, :update]}
  before_action :set_calendar, {only: [:show, :edit, :update, :destroy]}

  def index
    @calendars = Calendar.where(user_id: @current_user.id)
  end

  def show
  end

  def new
    @calendar = Calendar.new
  end

  def create
    @calendar = Calendar.new(calendar_params)
    @calendar.user_id = @current_user.id
    if @calendar.save
      flash[:notice] = "カレンダーを登録しました"
      redirect_to calendars_url
    else
      render("calendars/new")
    end
  end

  def edit
  end

  def update
    respond_to do |format|
      if @calendar.update(calendar_params)
        format.html { redirect_to calendars_url, notice: 'カレンダー情報を更新しました' }
        format.json { head :no_content }
      else
        flash.now[:notice] = "正しく入力してください"
        format.html { render :edit }
        format.json { render json: @calendar.errors, status: :unprocessable_entity }
      end
    end
  end

  def select
    session[:calendar_id] = params[:calendar_id]
  end

  def destroy
    @calendar.destroy
    respond_to do |format|
      format.html { redirect_to calendars_url, notice: '予定を削除しました' }
      format.json { head :no_content }
    end
  end


  private

  def set_calendar
    @calendar = Calendar.find_by(id: params[:id])
  end


  def calendar_params
    params.require(:calendar).permit(
      :title,
      :color_id
    )
  end

  def color_select
    @colors = Color.select(:color_type,:id).distinct
  end
end
