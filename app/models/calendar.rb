class Calendar < ApplicationRecord
    validates :title,{uniqueness: true}
    has_many :calendar_events
    has_many :events, :through => :calendar_events
    belongs_to :user
end
