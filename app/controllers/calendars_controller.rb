class CalendarsController < ApplicationController
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
    if @calendar.save
      session[:calendar_id] = @calendar.id
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

  def search
    @calendar = Calendar.where(id:params[:calendar_id])
     session[:calendar_id] = @calendar.id
    redirect_to "index"
  end

  private
  def calendar_params
    params.require(:calendar).permit(
      :title
    )
  end
end
