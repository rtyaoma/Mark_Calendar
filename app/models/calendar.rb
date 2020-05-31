class Calendar < ApplicationRecord
    validates :user_id, {presence: true}
    validates :color_id, {presence: true}
    validates :title, {presence: true}

    has_many :calendar_events
    has_many :events, :through => :calendar_events
    belongs_to :user,dependent: :destroy
    belongs_to :color

    #attribute :title, :string, default: 'プライベート'
    #attribute :color_id, :integer, default: '1'

    def events
        return Event.where(calendar_id: self.id, user_id: self.user_id)
    end

end
