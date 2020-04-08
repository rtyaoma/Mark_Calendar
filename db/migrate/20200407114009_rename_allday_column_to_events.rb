class RenameAlldayColumnToEvents < ActiveRecord::Migration[5.2]
  def change
    rename_column :events, :allday, :allDay
  end
end
