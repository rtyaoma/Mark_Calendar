class CalendarsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :color_select, {only: [:new, :edit]}
  def index
    @calendars = Calendar.where(user_id: @current_user.id)
  end

  def show
    @calendar = Calendar.find_by(id: params[:id])
  end

  def new
    @calendar = Calendar.new
  end

  def create
    @calendar = Calendar.new(calendar_params)
    @calendar.user_id = @current_user.id
    if @calendar.save
      flash[:notice] = "カレンダーを登録しました"
      redirect_to("/calendars/#{@calendar.id}")
    else
      render("calendars/new")
    end
  end

  def edit
    @calendar = Calendar.find_by(id: params[:id])
  end

  def update
    @calendar = Calendar.find_by(id: params[:id])
    @calendar.title = params[:title]
    if @calendar.save
      flash[:notice] = "カレンダーを編集しました"
      redirect_to("/calendars/#{@calendar.id}")
    else
      render("calendars/edit")
    end
  end

  def select
    session[:calendar_id] = params[:calendar_id]
  end

  private
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
