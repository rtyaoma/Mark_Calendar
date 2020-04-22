class ColorsController < ApplicationController
  def index
    @colors = Color.all
  end

  def show
    @color = Color.find_by(id: params[:id])
  end
    
  def new
     @color = Color.new
  end
    
  def create
    @color = Color.new(color_params)
    if @color.save
      flash[:notice] = "カレンダーを登録しました"
      redirect_to("/colors/index")
    else
      render("colors/new")
    end
  end
    
  def edit
    @color = Color.find_by(id: params[:id])
  end
    
  def update
    @color = Color.find_by(id: params[:id])
    if @color.save
      flash[:notice] = "カレンダーを編集しました"
      redirect_to("/calendars/#{@color.id}")
    else
      render("calendars/edit")
    end
  end
        
      private
      def color_params
        params.require(:color).permit(
          :color_type
        )
      end
end
