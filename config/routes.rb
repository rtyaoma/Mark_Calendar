Rails.application.routes.draw do
  namespace :admin do
    resources :users
  end
  get 'home/top'
  namespace :api, { format: 'json' } do
    namespace :v1 do
        resources :events
        #post 'events/index' => 'events#index'

    end
  end
  #format 'json' do
    #get 'events/index'
  #end

  resources :colors
  post 'new_select' => 'events#new_select'
  get 'filter' => 'tasks#filter'
  post 'select' => 'events#select'
  get 'display' => 'events#display'
  post 'logout' => 'users#logout'

  post 'sub_tasks/:id/done' => 'sub_tasks#done' 
  post 'sub_tasks/:id/begin' => 'sub_tasks#begin'

  resources :users
  get 'signup' => 'users#new'

  resources :tasks
  get 'tasks/tomorrow' => 'tasks#tomorrow'
  post 'tasks/:id/begin' => 'tasks#begin'
  get 'tasks/incomplete' => 'tasks#incomplete'
  get 'tasks/complete' => 'tasks#complete'
  get 'tasks/today' => 'tasks#today'
  post 'tasks/:id/done' => 'tasks#done' 

  resources :calendars

  resources :events

  post 'events_show' => 'events#events_show'

  get 'events/today' => 'events#today'
  post 'events/index' => 'events#index'
  get 'events/click' => 'events#click_new'
  get 'events/refetch' => 'events#refetch_index'
  get 'events/click/:id' => 'events#click_show'
  get 'login' => 'users#login_form'
  post 'login' => 'users#login'
  
  root 'home#top'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
