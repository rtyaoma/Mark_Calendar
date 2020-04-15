class CalendarsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    @calendars = Calendar.all
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
      :title
    )
  end
end
