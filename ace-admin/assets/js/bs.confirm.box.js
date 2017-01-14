window.jQuery = window.jQuery || {};

/**
 * confirmBox module for bootstrap plugin
 * Kevin Yan
 * 2017.1.13
 */
(function($) {
	"use strict";
	// if jQuery library has not been found
	if (typeof $ !== 'function') return false;
	
	$.fn.confirmBox = function(opts) {
		return this.each(function() {
			var $this = $(this), $modal,
				modalTarget, isTargetId, isTargetClass;

			var Conf = {
				title: '确认框',
				content: '',
				hasFade: false,
				callback: function() {},
				init: function() {
					if (Conf.preHandle()) {
						Conf.build();
						Conf.listen();
					} else {
						console.log('dataTarget配置错误或页面已有元素');
					}
				},
				preHandle: function() {
					var firstStr = '';

					modalTarget = $this.data('target');

					// start width '#' or '.', and at least two letters
					if (modalTarget.length > 2) {
						firstStr = modalTarget.substring(0, 1);
						if (firstStr === '#' || firstStr === '.') {
							if (!$(modalTarget).length) {
								// 满足条件，设定状态量，进入下序程序
								if (firstStr === '#') {
									isTargetId = true;
								} else {
									isTargetClass = true;
								}
							} else {
								// 如果元素已存在，退出程序
								return false;
							}
						} else {
							// 如果dataTarget首字符非'#'或'.'，退出程序
							return false;
						}
					} else {
						// 如果dataTarget少于2个字母，退出程序
						return false;
					}
					return true;
				},
				build: function() {
					var target = modalTarget.substring(1, modalTarget.length);
					var fade = Conf.hasFade? ' fade' : '';
					var temp =
						'<div class="modal' + fade + (isTargetClass ? ' ' + target : '') + '"' + (isTargetId ? ' id="' + target + '"' : '') +
						' tabindex="-1" role="dialog" aria-hidden="true">' +
						'	<div class="modal-dialog">' +
						'		<div class="modal-content">' +
						'			<div class="modal-header">' +
						'				<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
						'               <h4 class="modal-title">' + Conf.title + '</h4>' +
						'			</div>' +
						'           <div class="modal-body">' + Conf.content + '</div>' +
						'           <div class="modal-footer">' +
						'               <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
						'           </div>' +
						'		</div>' +
						'	</div>' +
						'</div>';
					$('body').append(temp);
					$modal = $(modalTarget);
				},
				listen: function() {
					$modal.on('hidden.bs.modal', function() {
						typeof Conf.callback === 'function' && Conf.callback();
					})
				}
			};

			// initial
			($.isPlainObject(opts) ? $.extend(Conf, opts) : Conf).init();
		});
	};
	
})(jQuery);
