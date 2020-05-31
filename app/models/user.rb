class User < ApplicationRecord
    validates :name,{presence:true}
    validates :email,{presence:true,uniqueness:true}
    has_secure_password
    has_one_attached :image
    has_many :calendars
    has_many :events, dependent: :destroy


    
    def events
        return Event.where(user_id: self.id)
    end

    def calendars
        return Calendar.where(user_id: self.id).pluck(:id)
    end

    after_create do 
    @calendar = Calendar.new(
      title: "プライベート",
      color_id: 1,
      user_id: self.id)
    @calendar.save
    end

end
