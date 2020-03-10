class RenamePosswordColumnUsers < ActiveRecord::Migration[5.2]
  def change
    rename_column :users, :possword, :password
  end
end
