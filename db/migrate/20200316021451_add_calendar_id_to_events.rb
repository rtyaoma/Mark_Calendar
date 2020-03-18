class AddCalendarIdToEvents < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :calendar_id, :integer
  end
end
