class AddStartOnToEvent < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :start_on, :date
  end
end
