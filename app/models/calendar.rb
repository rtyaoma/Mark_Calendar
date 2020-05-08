class Calendar < ApplicationRecord
    validates :user_id, {presence: true}
    validates :color_id, {presence: true}
    validates :title, {presence: true}

    has_many :calendar_events
    has_many :events, :through => :calendar_events
    belongs_to :user
    belongs_to :color

end
