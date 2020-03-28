class RenameStartColumnToEvents < ActiveRecord::Migration[5.2]
  def change
    rename_column :events, :start, :starts_at
  end
end
