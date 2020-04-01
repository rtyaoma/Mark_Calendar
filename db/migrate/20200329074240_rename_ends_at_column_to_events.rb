class RenameEndsAtColumnToEvents < ActiveRecord::Migration[5.2]
  def change
    rename_column :events, :ends_at, :end
  end
end
