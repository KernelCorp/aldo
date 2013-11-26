Aldo::Application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  root to: 'main#index'
  get 'contacts', to: 'main#contacts'
  get 'about-company', to: 'main#about'
end
