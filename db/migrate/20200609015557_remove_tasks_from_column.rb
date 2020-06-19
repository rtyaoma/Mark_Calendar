class RemoveTasksFromColumn < ActiveRecord::Migration[5.2]
  def change
    remove_column :tasks, :project_id, :integer
    remove_column :tasks, :tag_id, :integer
  end
end
