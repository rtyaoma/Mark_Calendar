class CreateSubTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :sub_tasks do |t|
      t.string :title
      t.integer :task_id
      t.boolean :status

      t.timestamps
    end
  end
end
