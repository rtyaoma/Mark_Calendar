class User < ApplicationRecord
    validates :name,{presence:true}
    validates :email,{presence:true,uniqueness:true}
    has_secure_password
    has_one_attached :image
    has_many :calendars
    
    def events
        return Event.where(user_id: self.id)
    end

end
