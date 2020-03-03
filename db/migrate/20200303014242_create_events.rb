class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :title
      t.datetime :start
      t.datetime :end
      t.string :color
      t.string :place
      t.text :description
      t.boolean :allday
      t.timestamps
    end
  end
end
