class RemoveEventsFromColum < ActiveRecord::Migration[5.2]
  def change
    remove_column :events, :start_on, :date
    remove_column :events, :end_on, :date
  end
end
