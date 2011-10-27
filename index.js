Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function() {

        var form;
        
        Ext.regModel('User', {
            fields: [
                {name: 'name',     type: 'string'},
                {name: 'password', type: 'password'}
            ]
        });
        
        var overlayTb = new Ext.Toolbar({
            dock: 'top'
       	    });
       	    
           var overlay = new Ext.Panel({
            floating: true,
            modal: true,
            centered: true,
            width: Ext.is.Phone ? 100 : 200,
            height: Ext.is.Phone ? 100 : 200,
            styleHtmlContent: true,
            scroll: 'vertical',
            dockedItems: overlayTb,
            contentEl: 'lipsum',
            cls: 'htmlcontent'
        });
        
        
        var formBase = {
            scroll: 'vertical',
            url   : 'postUser.php',
            standardSubmit : false,
            items: [{
                    xtype: 'fieldset',
                    title: 'Login',
                    instructions: 'Introduza os dados.',
                    defaults: {
                        required: true,
                        labelAlign: 'left',
                        labelWidth: '40%'
                    },
                    items: [
                    {
                        xtype: 'textfield',
                        name : 'name',
                        label: 'Name',
                        useClearIcon: true,
                        autoCapitalize : false
                    }, {
                        xtype: 'passwordfield',
                        name : 'password',
                        label: 'Password',
                        useClearIcon: false
                    }]
                }],
            listeners : {
                submit : function(form, result){
                    console.log('success', Ext.toArray(arguments));
                },
                exception : function(form, result){
                	overlay.setCentered(true);
            		overlayTb.setTitle('Login');
            		overlay.show();
                    console.log('failure', Ext.toArray(arguments));
                }
            },
        
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {xtype: 'spacer'},
                        {
                            text: 'Voltar',
                            handler: function() {
                                form.reset();
                            }
                        },
                        {
                            text: 'Entrar',
                            ui: 'confirm',
                            handler: function() {
                                if(formBase.user){
                                    form.updateRecord(formBase.user, true);
                                }
                                form.submit({
                                    waitMsg : {message:'Submitting', cls : 'demos-loading'}
                                });
                            }
                        }
                    ]
                }
            ]
        };
        
        if (Ext.is.Phone) {
            formBase.fullscreen = true;
        } else {
            Ext.apply(formBase, {
                autoRender: true,
                floating: true,
                modal: true,
                centered: true,
                hideOnMaskTap: false,
                height: 385,
                width: 480
            });
        }
        
        form = new Ext.form.FormPanel(formBase);
        form.show();
    }
});
