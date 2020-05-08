class SubTasksController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_sub_task, {only: [:done, :begin]} #パラメータのidからレコードを特定するメソッド

  def done
    @sub_task.update(status: true)
  end
    
  def begin
    @sub_task.update(status: false)
  end

  private
    def set_sub_task
      @sub_task = SubTask.find_by(id:params[:id])
    end
  
    def sub_task_params
      params.require(:sub_task).permit(
        :title,
        :status,
      )
    end

end
