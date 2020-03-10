class User < ApplicationRecord
    validates:name,{presence:true}
    validates:email,{presence:true,uniqueness:true}
    validates:password,{presence:true,uniqueness:true}

    def events
        return Event.where(user_id: self.id)
    end
end
