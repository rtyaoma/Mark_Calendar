class Event < ApplicationRecord
    validates :user_id, {presence: true}
    validates :title, {presence: true, length:{maximum:30}}
    validates :start, {presence: true}
    validates :end, {presence: true}
    validates :calendar_id, {presence: true}
    validates :description, {length:{maximum:40}}
    acts_as_taggable

    
    has_many :calendar_events
    has_many :calendars, :through => :calendar_events  

    def user
        return User.find_by(id: self.user_id)
    end
    
    def calendar
        return Calendar.find_by(id: self.calendar_id)
    end

    before_save do
        start_on = self.start.strftime('%d') 
        end_on = self.end.strftime('%d') 
        if self.allDay? && start_on == end_on
          self.start = self.start.beginning_of_day
          self.end = self.end.tomorrow.beginning_of_day
        end
      end

end
