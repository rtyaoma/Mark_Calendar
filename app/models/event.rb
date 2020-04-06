class Event < ApplicationRecord
    validates :user_id, {presence: true}
    has_many :calendar_events
    has_many :calendars, :through => :calendar_events
    
    def user
        return User.find_by(id: self.user_id)
    end

    def calendar
        return Calendar.where(id: session[:calendar_id])
    end

    before_save do 
        if allday?
            self.start = start_on.beginning_of_day if start_on
            self.end = nil #end_on.tomorrow.beginning_of_day if end_on
        else
            self.start_on = nil
            self.end_on = nil
        end
    end

end
