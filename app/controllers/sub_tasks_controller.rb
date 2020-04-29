class SubTasksController < ApplicationController
    before_action :set_task, {only: [:done, :begin]} #パラメータのidからレコードを特定するメソッド

    def done
        @sub_task.update(status: true)
        render : "/tasks/index"
      end
    
      def begin
        @sub_task.update(status: false)
        render : "/tasks/index"
      end

      private
      def set_sub_task
        @task = Task.find_by(id:params[:id])
      end
  
      def sub_task_params
        params.require(:sub_task).permit(
          :title,
          :status,
        )
      end

end
