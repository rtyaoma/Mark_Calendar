class CreateCalendars < ActiveRecord::Migration[5.2]
  def change
    create_table :calendars do |t|
      t.string :calendar_title
      t.integer :user_id

      t.timestamps
    end
  end
end
