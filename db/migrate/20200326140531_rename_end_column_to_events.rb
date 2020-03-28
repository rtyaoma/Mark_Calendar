class RenameEndColumnToEvents < ActiveRecord::Migration[5.2]
  def change
    rename_column :events, :end, :ends_at
  end
end
