class ColorsController < ApplicationController
  before_action :set_color, {only: [:show, :edit, :update]}
  def index
    @colors = Color.all
  end

  def show
  end
    
  def new
     @color = Color.new
  end
    
  def create
    @color = Color.new(color_params)
    respond_to do |format|
      if @color.save
        format.html { redirect_to colors_url,　notice: "カレンダーを登録しました" }
        format.json { render :show, status: :created, location: @color }
      else
        flash.now[:notice] = "正しく入力してください"
        format.html { render :new }
        format.json { render json: @color.errors, status: :unprocessable_entity }
      end
    end
  end
    
  def edit
  end
    
  def update
    respond_to do |format|
      if @color.update(color_params)
        format.html { redirect_to colors_url, notice: 'タスクを更新しました。' }
        format.json { render :show, status: :ok, location: @color }
      else
        flash.now[:notice] = "正しく入力してください"
        format.html { render :edit }
        format.json { render json: @color.errors, status: :unprocessable_entity }
      end
    end
  end
        
      private

      def set_color
        @color = Color.find_by(id: params[:id])
      end

      def color_params
        params.require(:color).permit(
          :color_type
        )
      end
end
