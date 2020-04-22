class AddColorIdToCalendar < ActiveRecord::Migration[5.2]
  def change
    add_column :calendars, :color_id, :integer
  end
end
