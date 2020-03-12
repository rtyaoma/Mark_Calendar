class RenameCalendarTitleColumnToCalendars < ActiveRecord::Migration[5.2]
  def change
    rename_column :calendars, :calendar_title, :title
  end
end
