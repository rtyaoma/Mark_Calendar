class Event < ApplicationRecord
    validates :user_id, {presence: true}
    validates :title, {presence: true, length:{maximum:30}}
    validates :start, {presence: true}
    validates :end, {presence: true}
    validates :calendar_id, {presence: true}
    validates :description, {length:{maximum:40}}

    has_many :calendar_events
    has_many :calendars, :through => :calendar_events  

    def user
        return User.find_by(id: self.user_id)
    end
    
    def calendar
        return Calendar.find_by(id: self.calendar_id)
    end
    #def calendar
        #return Calendar.where(id: session[:calendar_id])
    #end

    #before_save do 
        #if allDay?
            #self.start = 'start'.beginning_of_day if start_on
            #self.end = 'end'.tomorrow.beginning_of_day if end_on
        #else
            #self.start_on = nil
            #self.end_on = nil
        #end
    #end

    

end
