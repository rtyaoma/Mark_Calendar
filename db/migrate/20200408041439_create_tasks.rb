class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :title
      t.datetime :deadline_date
      t.text :description
      t.boolean :status
      t.integer :user_id
      t.integer :calendar_id
      t.integer :tag_id
      t.integer :project_id
      t.timestamps
    end
  end
end
