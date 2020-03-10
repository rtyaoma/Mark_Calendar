class AddDefaultAlldayToEvent < ActiveRecord::Migration[5.2]
  def up
    change_column :events, :allday, :boolean, :default => false
  end

  def down
    change_column :events, :allday, :boolean
  end
end
