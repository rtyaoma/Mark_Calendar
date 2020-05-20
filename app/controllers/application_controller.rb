class ApplicationController < ActionController::Base
    before_action :set_current_user
    #before_action :set_current_calendar
        def set_current_user
            @current_user = User.find_by(id: session[:user_id])
        end

        #def set_current_calendar
          #@current_calendar = Calendar.find_by(id: session[:calendar_id])
        #end
        
        def authenticate_user
          logger.info "値を見たい #{@current_user.inspect}"
            if @current_user == nil
              flash[:notice] = "ログインが必要です"
              redirect_to("/login")
            end
        end

        def forbid_login_user
            if @current_user
              flash[:notice] = "すでにログインしています"
              redirect_to events_path
            end
        end
end
