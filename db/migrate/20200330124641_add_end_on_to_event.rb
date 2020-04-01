class AddEndOnToEvent < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :end_on, :date
  end
end
