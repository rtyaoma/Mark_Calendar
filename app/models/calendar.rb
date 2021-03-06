class Calendar < ApplicationRecord
    validates :user_id, {presence: true}
    validates :color_id, {presence: true}
    validates :title, {presence: true}

    has_many :calendar_events
    has_many :events, :through => :calendar_events
    belongs_to :user,dependent: :destroy
    belongs_to :color

 

    after_update do 
        color = Color.find_by(id: self.color_id)
        @events = Event.where(calendar_id: self.id, user_id: self.user_id)
        @events.each do |e|
            e.color = color.color_type
            e.update(color: color.color_type)
        end
    end

end
