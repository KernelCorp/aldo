ActiveAdmin.register Press do
  index do
    column :title
    default_actions
  end

  form do |f|
    f.inputs do
      f.input :title
      f.input :document, as: :file
      f.input :image, as: :file
    end
    f.actions
  end

  show do
    render partial: 'show', locals: { press: press }
  end
end