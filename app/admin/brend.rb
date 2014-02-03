ActiveAdmin.register Brend do
  config.filters = false

  index do
    column :name
    column :slug
    default_actions
  end
  
  form do |f|
    f.inputs do
      f.input :name
      f.input :header
      f.input :text

      f.input :background, as: :file
    end
    f.actions
  end

end
