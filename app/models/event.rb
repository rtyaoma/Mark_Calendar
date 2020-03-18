class Event < ApplicationRecord
    validates :user_id, {presence: true}
    has_many :calendar_events
    has_many :calendars, :through => :calendar_events
    def user
        return User.find_by(id: self.user_id)
    end

    def calendar
        return Calendar.find_by(id: self.calendar_id)
    end

end
