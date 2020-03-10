Rails.application.routes.draw do
  namespace :api, { format: 'json' } do
    namespace :v1 do
        resources :events
    end
  end
  format 'json' do
    get 'events/index'
  end
  get 'login' => 'users#login_form'
  post 'login' => 'users#login'
  post 'logout' => 'users#logout'

  patch "users/:id/update" => "users#update"
  get "users/:id/edit" => "users#edit"
  post "users/create" => "users#create"
  get "signup" => "users#new"
  get "users/index" => "users#index"
  get "users/:id" => "users#show"

  get 'events/index'
  get 'events/new' => 'events#new'
  get 'events/:id' => 'events#show'
  post 'events/create' => 'events#create'
  get 'events/:id/edit' => 'events#edit'
  patch 'events/:id/update' => 'events#update'
  post 'events/:id/destroy' => 'events#destroy'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
