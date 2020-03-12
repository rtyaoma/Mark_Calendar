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
    @calendar = Calendar.new(title: params[:title])
    if @calendar.save
      flash[:notice] = "カレンダーを登録しました"
      redirect_to("/calendar/#{@calendar.id}")
    else
      render("calendar/new")
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
end
